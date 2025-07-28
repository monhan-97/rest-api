#!/usr/bin/env node

import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

import * as dotenv from 'dotenv';

// 全局错误处理
process.on('unhandledRejection', err => {
  console.error('Unhandled promise rejection:', err);
  process.exit(1);
});

const args = process.argv.slice(2);

//获取执行命令时的参数
const scripts = ['build', 'dev'];

const environments = ['local', 'qa', 'uat', 'prod'];

const scriptIndex = scripts.indexOf(args[0]);

if (scriptIndex > -1) {
  const script = scripts[scriptIndex];

  const environment = environments.indexOf(args[1]) > -1 ? args[1] : environments[0];

  //  加载环境变量文件
  const envPath = path.resolve(process.cwd(), `.env.${environment}`);

  if (!fs.existsSync(envPath)) {
    console.error(`错误: 环境配置文件 ${envPath} 不存在`);
    console.error(`请创建该文件或使用有效的环境名称 `);
    process.exit(1);
  }

  dotenv.config({
    path: envPath,
  });

  // 设置环境变量
  process.env.NODE_ENV = script === 'dev' ? 'development' : 'production';
  process.env.APP_ENV = environment;

  console.log(`Running ${script} for ${environment} environment...`);

  switch (script) {
    case 'dev':
      execSync('concurrently "nodemon" "nodemon -x tsoa spec-and-routes"', {
        stdio: 'inherit',
        env: process.env, // 传递环境变量
      });
      break;
    case 'build':
      // 生产环境构建逻辑
      console.log('Building for production...');
      break;
    default:
      throw new Error(`Unknown script: ${script}`);
  }
} else {
  console.log('Unknown script "' + args[0] + '".');
}
