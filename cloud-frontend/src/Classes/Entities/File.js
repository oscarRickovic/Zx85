import TimeHelper from "../Helpers/TimeHelper";

export default class File {
    constructor(name, parentFolder) {
        this.name = name;
        this.path = parentPath + this.name;
        this.parentFolder = parentFolder;
        if(this.parentFolder != null) {
            this.parentFolder.addFile(this)
        }
        this.size = 0; // size in KB
        this.isDir = false;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = this.createdOn;
    }

    delete() {
        this.parentFolder.subFiles.filter(file => file.name !== this.name);
        this.parentFolder.lastModificationOn = TimeHelper.getCurrentDateTime()
        this.parentFolder.size -= this.size;
        return {res : true, message : "Deleted successfully"}
    }

}