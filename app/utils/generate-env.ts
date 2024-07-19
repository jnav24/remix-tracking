import fs, { WriteFileOptions } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';

// this assumes the file is in `app/utils/`
// code smell for cases where the file is NOT in `app/utils`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename) + '/../../';

const getPath = (file: string) => path.resolve(__dirname, file);

const getFile = (filePath: string) => {
    return fs.readFileSync(getPath(filePath), 'utf8');
};

const saveToFile = (path: string, content: string, options?: WriteFileOptions) => {
    fs.writeFileSync(getPath(path), content, options);
};

const createFileIfNotExists = (file: string, content: string) => {
    if (!fs.existsSync(getPath(file))) {
        saveToFile(file, content);
    }
};

const getAllEnvVariables = (content: string) => {
    const regex = new RegExp('^(\\w+)=', 'gm');
    const matches: RegExpMatchArray[] = [...content.matchAll(regex)];
    return Array.from(matches, (match) => match[1]);
};

const cleanup = (filename: string) => {
    if (fs.existsSync(getPath(filename))) {
        exec(
            `${getPath('./node_modules/prettier/bin/prettier.cjs')} --write "${getPath(filename)}"`,
            (err, stdout, stderr) => {
                if (err || stderr) {
                    console.error(`Command Error: ${stderr}`);
                }
            },
        );
    }
};

const generateEnvTypes = (result: string[]) => {
    if (result.length) {
        const typesFile = './app/types/env.d.ts';
        let typeString = 'export type EnvVariables = {\n';

        for (const variable of result) {
            if (!variable.includes('VITE_')) {
                typeString += `${variable}: string;\n`;
            }
        }

        typeString += '};\n';

        createFileIfNotExists(typesFile, '');
        saveToFile(typesFile, typeString);
        cleanup(typesFile);
    }
};

const updateEnvFileToMatchExample = () => {
    const envContent = getFile('./.env').split('\n');
    const exampleEnvContent = getFile('./.env.example')
        .split('\n')
        .map((item) => item.replace('=', ''));

    if (envContent.length !== exampleEnvContent.length) {
        const envObject = envContent.reduce(
            (result, current) => {
                if (current) {
                    const [key, val] = current.split('=');
                    return {
                        ...result,
                        [key]: val,
                    };
                }

                return result;
            },
            {} as Record<string, string>,
        );

        const newEnvContent = exampleEnvContent
            .map((item) => {
                if (!item) {
                    return '';
                }

                if (!envObject[item]) {
                    return `${item}=`;
                }

                return `${item}=${envObject[item]}`;
            })
            .join('\n');

        saveToFile('./.env', newEnvContent);
    }
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const generate = () => {
    try {
        rl.question(
            chalk.red(
                'This will generate a env variables based on the .env.example which will overwrite your .env and env.d.ts files.\n',
                '(NOTE: This will not overwrite .env values if the env variables exists in the .env.example)\n',
                'Do you want to continue? (yes/no) ',
            ),
            (answer) => {
                if (answer.match(/^y(es)?$/i)) {
                    console.log('Generating env files....');
                    const exampleEnv = getFile('./.env.example');
                    createFileIfNotExists('./.env', exampleEnv);
                    const result = getAllEnvVariables(exampleEnv);
                    generateEnvTypes(result);
                    updateEnvFileToMatchExample();
                    console.log('Env generation completed');
                } else {
                    console.log('Canceled env generation');
                }

                rl.close();
            },
        );
    } catch (err) {
        const error = err as { code?: string; path?: string };

        if (error?.code === 'ENOENT') {
            console.error(`File not found :: ${error?.path}`);
            return;
        }

        console.error(err);
    }
};

generate();
