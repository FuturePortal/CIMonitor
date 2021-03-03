# Run on Kubernetes

## Run directly

Note: If you want to customize the configuration, you are required to link Firebase. See the
[firebase documentation](../advanced/firebase.md) on how to do that.

Note that you shouldn't be running more than 1 replica.

```yml
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
        - image: cimonitor/server:latest
          name: cimonitor-server-container
          imagePullPolicy: Always
          resources:
            requests:
              memory: "16Mi"
              cpu: "10m"
            limits:
              memory: "256Mi"
              cpu: "500m"
          ports:
            - containerPort: 9999
          env:
            - name: APP_ENV
              value: production

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
      targetPort: 9999
  selector:
    app: cimonitor-server

---

apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: cimonitor-server-ingress
  namespace: cimonitor
  annotations:
    kubernetes.io/tls-acme: "true"
    kubernetes.io/ingress.class: "nginx"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    cert-manager.io/acme-challenge-type: http01
spec:
  tls:
    - secretName: cimonitor-server-tls
      hosts:
        - YOUR_HOST_ADDRESS
  rules:
    - host: YOUR_HOST_ADDRESS
      http:
        paths:
          - path: /
            backend:
              serviceName: cimonitor-server-service
              servicePort: 80
```

## With firebase config

Create a firebase secret, containing your firebase service account private key json:

```
export FIREBASE_PRIVATE_KEY=$(cat/YOUR-FIREBASE-ACCOUNT-PRIVATE-KEY-FILE.json)

kubectl create secret generic firebase-private-key \
    --namespace cimonitor \
    --from-file=firebase-private-key.json=$FIREBASE_PRIVATE_KEY
```

Use the top example, except replace the deployment:

```yml
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
        - image: cimonitor/server:latest
          name: cimonitor-server-container
          imagePullPolicy: Always
          resources:
            requests:
              memory: "16Mi"
              cpu: "10m"
            limits:
              memory: "256Mi"
              cpu: "500m"
          ports:
            - containerPort: 9999
          env:
            - name: FIREBASE_PRIVATE_KEY_FILE
              value: "/etc/firebase-secrets/firebase-private-key.json"
            - name: FIREBASE_URL
              value: "https://YOUR_UNIQUE_FIREBASE_SLUG.firebaseio.com/"
            - name: STORAGE
              value: "firebase"
            - name: APP_ENV
              value: production
          volumeMounts:
            - name: firebase-private-key
              readOnly: true
              mountPath: "/etc/firebase-secrets"
```
