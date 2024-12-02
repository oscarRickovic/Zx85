import DirFilesDatas from "../Datas/DirFilesDatas";

export default class CreateFolderHandler {
    static onCreateFolder (newFolderName, parentPath) {
        ! parentPath && (parentPath = {name : "Home", isDirectory : true, path : ""})
        const newFolder = {
            name: newFolderName,
            isDirectory: true,
            path: `${parentPath.path}/${newFolderName}`,
            updatedAt: new Date().toISOString(),
        };
        DirFilesDatas.data.push(newFolder)
        return DirFilesDatas.data;
    }
}