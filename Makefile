docker-build: 
	docker build -f Dockerfile -t localhost:5000/inventory-management-ui .

docker-run: 
	docker run -it -p 8085:3000 localhost:5000/inventory-management-ui

docker-push:	
	docker push localhost:5000/inventory-management-ui