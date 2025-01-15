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