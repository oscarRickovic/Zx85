import TimeHelper from "../Helpers/TimeHelper";

export default class Folder {

    constructor(name, parentFolder = new Folder ("root", "")) {
        this.name = name;
        this.path = parentFolder.path + "/" +this.name;
        this.parent = parentFolder;
        if(this.parent != null) {
            this.parent.addFolder(this);
        }
        this.subFolders = [];
        this.subFiles = [];
        this.size = 0; // size in KB
        this.isDir = true;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = this.createdOn;
    }

    constructor(name, path) {
        this.name = name;
        this.path = path;
        this.parent = null;
        this.subFolders = [];
        this.subFiles = [];
        this.size = 0;
        this.isDir = true;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = this.createdOn;
    }
    
    isNameValidInFiles(name) {
        for(let i =0; i < this.subFiles.length; i++) {
            if(this.subFiles[i].name == name) {
                return {res : false, message : "exist File with same name"}
            }
        }
        return {res: true, message : "name valid"}
    }

    isNameValidInFolders(name) {
        for(let i = 0; i < this.subFolders.length; i++) {
            if(this.subFolders[i].name == folder.name) {
                return {res : false, message : "Exist Folder with same name"}
            }
        }
        return {res: true, message : "name valid"}
    }

    addFolder(folder) {
        //check Instance.
        if(!( folder instanceof Folder)) return;

        //checkName repetition
        let isNameValidInFolders = this.isNameValidInFolders(folder.name);
        if(! isNameValidInFolders) {
            return isNameValidInFolders;
        }
        let isNameValidInFiles = this.checkFileExistance(folder.name);
        if(!isNameValidInFiles) {
            return isNameValidInFiles;
        }
        // add the Folder
        this.subFolders.push(folder);
        folder.path = this.path + "/" + folder.name;
        this.lastModificationOn = TimeHelper.getCurrentDateTime();
        folder.lastModificationOn = this.lastModificationOn;
        this.size += folder.size;
        
        for (let i =0; i < this.subFolders.length; i++) {
            this.addFolder(this.subFolders[i]);
        }
        for(let i =0; i < this.subFiles; i++) {
            this.addFile(this.subFiles[i])
        }
        return {res : true, message : "Folder added successfully"}
    }

    addFile(file) {
        if(! (file instanceof File)) return ;

        let isNameValidInFolders = this.isNameValidInFolders(file.name);
        if(! isNameValidInFolders) {
            return isNameValidInFolders;
        }
        let isNameValidInFiles = this.checkFileExistance(file.name);
        if(!isNameValidInFiles) {
            return isNameValidInFiles;
        }

        this.subFiles.push(file);
        file.path = this.path + "/" +file.name;
        this.lastModificationOn = TimeHelper.getCurrentDateTime();
        file.lastModified = this.lastModificationOn;
        this.size += file.size;
        return {res : true, message : "File added successfully"}
    }

    delete() {
        for(let i = 0; i < this.subFiles.length; i++) {
            this.subFiles[i].delete();
        }
        for(let i =0; i < this.subFolders.length; i++) {
            this.subFolders[i].delete();
        }
        this.parentFolder.subFolders.filter(folder => folder.name !== this.name);
        this.parentFolder.lastModificationOn = TimeHelper.getCurrentDateTime()
        this.parentFolder.size -= this.size;
        return {res : true, message : "Deleted successfully"}
    }
}