set -e

create_env() {
  echo "VITE_API_URL=http://localhost:3000" > ./apps/frontend/.env

  echo "DATABASE_URL=\"postgresql://harbor_admin:123@localhost:5434/harbor_db?schema=public\"" > ./apps/backend/.env
  echo "CORS_ORIGIN=http://localhost:5173" >> ./apps/backend/.env
  echo "PORT=3000" >> ./apps/backend/.env

  echo "DB_USER=harbor_admin" > ./.env
  echo "DB_PASSWORD=123" >> ./.env
  echo "DB_NAME=harbor_db" >> ./.env
  echo "DB_DEV_PORTS=5434" >> ./.env
  echo "DB_TEST_PORTS=5435" >> ./.env
}

create_env_example() {
  echo "VITE_API_URL=http://localhost:your-backend-port" > ./apps/frontend/.env.example

  echo "DATABASE_URL=\"postgresql://your-admin-name:your-password@localhost:your-db-dev-port/your-db-name\"" > ./apps/backend/.env.example
  echo "CORS_ORIGIN=http://localhost:your-apps/frontend-port" >> ./apps/backend/.env.example
  echo "PORT=your-port" >> ./apps/backend/.env.example

  echo "DB_USER=your-admin-name" > ./.env.example
  echo "DB_PASSWORD=your-password" >> ./.env.example
  echo "DB_NAME=your-db-name" >> ./.env.example
  echo "DB_DEV_PORTS=your-db-dev-port" >> ./.env.example
  echo "DB_TEST_PORTS=your-db-test-port" >> ./.env.example
}

# install() {
#   (cd ./backend && pnpm install)
#   (cd ./apps/frontend && pnpm install)
# }

# backend_db_up() {
#   (cd backend && pnpm db:dev:up)
# }

# backend_db_migrate() {
#   (cd backend && pnpm prisma:dev:deploy)
# }

# generate_prisma_client() {
#   (cd backend && pnpm prisma generate)
# }

# backend_seed() {
#   (cd backend && pnpm data:seed)
# }

# backend_delete() {
#   (cd backend && pnpm data:delete)
# }

# backend_start() {
#   (cd backend && pnpm start:dev)
# }

# apps/frontend_start() {
#   (cd apps/frontend && pnpm dev)
# }

start() {
  backend_db_up
  backend_db_migrate
  generate_prisma_client
  backend_seed
  backend_start &
  sleep 5
  frontend_start
}

"$@"