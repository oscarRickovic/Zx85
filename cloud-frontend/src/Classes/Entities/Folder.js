import TimeHelper from "../Helpers/TimeHelper";

export default class Folder {
    constructor(name, parentPath = "/") {
        this.name = name;
        this.path = parentPath + this.name;
        this.subFolders = [];
        this.subFiles = [];
        this.size = 0;
        this.isDir = true;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = TimeHelper.getCurrentDateTime();
    }

    addFolder(folder) {
        if(!( folder instanceof Folder)) return;
        this.subFolders.push(folder);
        this.lastModificationOn = TimeHelper.getCurrentDateTime();
        this.size += folder.size; 
    }

    addFile(file) {
        if(! (file instanceof File)) return ;
        this.subFiles.push(file);
        this.lastModificationOn = TimeHelper.getCurrentDateTime();
        this.size += file.size;
    }
}