create-env:
	echo "VITE_API_URL=http://localhost:3000" > ./frontend/.env

	echo "DATABASE_URL=\"postgresql://harbor_admin:123@localhost:5434/harbor_db?schema=public\"" > ./backend/.env
	echo "CORS_ORIGIN=http://localhost:5173" >> ./backend/.env
	echo "PORT=3000" >> ./backend/.env

	echo "DB_USER=harbor_admin" > ./.env
	echo "DB_PASSWORD=123" >> ./.env
	echo "DB_NAME=harbor_db" >> ./.env
	echo "DB_DEV_PORTS=5434" >> ./.env
	echo "DB_TEST_PORTS=5435" >> ./.env

create-env-example:
	echo "VITE_API_URL=http://localhost:your-backend-port" > ./frontend/.env.example

	echo "DATABASE_URL=\"postgresql://your-admin-name:your-password@localhost:your-db-dev-port/your-db-name\"" > ./backend/.env.example
	echo "CORS_ORIGIN=http://localhost:your-frontend-port" >> ./backend/.env.example
	echo "PORT=your-port" >> ./backend/.env.example

	echo "DB_USER=your-admin-name" > ./.env.example
	echo "DB_PASSWORD=your-password" >> ./.env.example
	echo "DB_NAME=your-db-name" >> ./.env.example
	echo "DB_DEV_PORTS=your-db-dev-port" >> ./.env.example
	echo "DB_TEST_PORTS=your-db-test-port" >> ./.env.example

install:
	cd ./backend && pnpm install
	cd ./frontend && pnpm install

backend-db-up:
	cd backend && pnpm db:dev:up

backend-db-migrate:
	cd backend && pnpm prisma:dev:deploy

generate-prisma-client:
	cd ./backend && pnpm prisma generate

backend-seed:
	cd backend && pnpm data:seed

backend-delete:
	cd backend && pnpm data:delete

backend-start:
	cd backend && pnpm start:dev

frontend-start:
	cd frontend && pnpm dev

start:
	make backend-db-up
	make backend-db-migrate
	make generate-prisma-client
	make backend-seed
	make backend-start &
	sleep 5 
	make frontend-start