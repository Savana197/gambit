import path from "path"
import fs from "fs"
export function getOpenings(){
    const openingDirectory = path.join(process.cwd(), "public/openings");
    const files = fs.readdirSync(openingDirectory);

    return files.map(file => {
        const name = file
            .replace(/\.(png|jpg|jpeg|webp)$/i, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase());
        return {
            src: `/openings/${file}`,
            name
        };
    });
}