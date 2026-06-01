docker compose up -d

start "Api-java" cmd /k "cd api-java && gradlew bootRun"

start "Media-CMS-Web" cmd /k "cd media-cms-web && npm run dev"