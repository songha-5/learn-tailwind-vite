/* import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
}); */

/*
//  파일경로가 늘었을때
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html", // 기본 index.html
        likelion: "src/likelion.html",
      },
    },
  },
  appType: "mpa", // fallback 사용안함
  server: {
  },
}); */

// 심화
import { defineConfig } from "vite";
import path from "path";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";

// findAllHtmlFiles 함수 정의 추가
function findAllHtmlFiles(directory) {
  const htmlFiles = {};

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith(".html")) {
        // 키 이름을 경로에서 추출 (확장자 제외)
        const key = path.relative(__dirname, filePath).replace(".html", "");
        htmlFiles[key] = filePath;
      }
    }
  }

  scanDirectory(directory);
  return htmlFiles;
}

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        ...findAllHtmlFiles(path.resolve(__dirname, "src")),
      },
    },
  },
  appType: "mpa", // fallback 사용안함
  server: {},
});
