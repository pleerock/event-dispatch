import * as fs from 'fs';
import * as path from 'path';

/**
 * Common event dispatcher utility functions.
 */
export class Utils {

    /**
     * Makes "require()" all js files (or custom extension files) in the given directory.
     */
    static requireAll(directories: string[], extension: string = '.js'): any[] {
        let files: any[] = [];
        directories.forEach((dir: string) => {
            if (fs.existsSync(dir)) {
                fs.readdirSync(dir).forEach((file: string) => {
                    if (fs.statSync(dir + '/' + file).isDirectory()) {
                        let requiredFiles = Utils.requireAll([dir + '/' + file], extension);
                        requiredFiles.forEach((file: string) => files.push(file));
                    } else if (path.extname(file) === extension) {
                        files.push(require(dir + '/' + file));
                    }
                });
            }
        }); // todo: implement recursion
        return files;
    }

}