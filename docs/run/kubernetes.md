# Running on Kubernetes

Running CIMonitor on Kubernetes only needs 1 replica. You can simply apply the the file below after you replaced the
environment specific variables.

```yaml
kind: Namespace
apiVersion: v1
metadata:
    name: cimonitor

---
apiVersion: apps/v1
kind: Deployment
metadata:
    name: cimonitor-server
    namespace: cimonitor
    labels:
        app: cimonitor-server
spec:
    replicas: 1
    selector:
        matchLabels:
            app: cimonitor-server
    template:
        metadata:
            labels:
                app: cimonitor-server
        spec:
            containers:
                - image: cimonitor/server:4.0.0
                  name: cimonitor-server-container
                  imagePullPolicy: Always
                  resources:
                      requests:
                          memory: '16Mi'
                          cpu: '10m'
                      limits:
                          memory: '256Mi'
                          cpu: '500m'
                  ports:
                      - containerPort: 3030

---
apiVersion: v1
kind: Service
metadata:
    name: cimonitor-server-service
    namespace: cimonitor
spec:
    type: ClusterIP
    ports:
        - port: 80
          targetPort: 3030
    selector:
        app: cimonitor-server

---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
    name: cimonitor-server-ingress
    namespace: cimonitor
    annotations:
        kubernetes.io/tls-acme: 'true'
        kubernetes.io/ingress.class: 'nginx'
        cert-manager.io/cluster-issuer: 'letsencrypt-prod'
        cert-manager.io/acme-challenge-type: http01
spec:
    tls:
        - secretName: cimonitor-server-tls
          hosts:
              - cimonitor.example.com # TODO: replace!
    rules:
        - host: cimonitor.example.com # TODO: replace!
          http:
              paths:
                  - path: /
                    pathType: Prefix
                    backend:
                        service:
                            name: cimonitor-server-service
                            port:
                                number: 80
```

## Running with Firebase storage

> Note: If you want to customize the configuration, you are required to link Firebase. See the
> [firebase documentation](../config/firebase.md) on how to do that.

Simply replace the deployment from the snippet above with the following code:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: cimonitor-server
    namespace: cimonitor
    labels:
        app: cimonitor-server
spec:
    replicas: 1
    selector:
        matchLabels:
            app: cimonitor-server
    template:
        metadata:
            labels:
                app: cimonitor-server
        spec:
            volumes:
                - name: firebase-private-key
                  secret:
                      secretName: firebase-private-key
            containers:
                - image: cimonitor/server:4.0.0
                  name: cimonitor-server-container
                  imagePullPolicy: Always
                  resources:
                      requests:
                          memory: '16Mi'
                          cpu: '10m'
                      limits:
                          memory: '256Mi'
                          cpu: '500m'
                  ports:
                      - containerPort: 9999
                  env:
                      - name: FIREBASE_KEY_FILE
                        value: '/etc/firebase-secrets/firebase-private-key.json'
                      - name: FIREBASE_URL
                        value: 'https://futureportal-cimonitor.firebaseio.com/'
                      - name: STORAGE_TYPE
                        value: 'firebase'
                  volumeMounts:
                      - name: firebase-private-key
                        readOnly: true
                        mountPath: '/etc/firebase-secrets'
```

And make sure you have created your firebase secret:

```
export FIREBASE_PRIVATE_KEY=$(cat/YOUR-FIREBASE-KEY-FILE.json)

kubectl create secret generic firebase-private-key \
    --namespace cimonitor \
    --from-file=firebase-private-key.json=$FIREBASE_PRIVATE_KEY
```

If you've applied this to your Kubernetes cluster, CIMonitor should be running!
