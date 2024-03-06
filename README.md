# Printing Service

## Run in Container

```shell
sudo docker build -t mes-printing-service .
sudo docker run -d --name mes-printing-service \
 -p 5173:5173 -e VITE_PRINTER_SERVER_URL=http://172.32.1.188:8000 \
  mes-printing-service
```