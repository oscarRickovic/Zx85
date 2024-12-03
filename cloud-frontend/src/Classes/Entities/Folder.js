import TimeHelper from "../Helpers/TimeHelper";

export default class Folder {
    constructor(name, parentFolder = null) {
        this.name = name || "root";
        this.parent = parentFolder;
        this.path = parentFolder ? `${parentFolder.path}/${this.name}` : "";
        this.subFolders = [];
        this.subFiles = [];
        this.size = 0; // size in KB
        this.isDir = true;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = this.createdOn;

        if (parentFolder) {
            parentFolder.addFolder(this);
        }
    }

    isNameUnique(name) {
        for (let file of this.subFiles) {
            if (file.name === name) {
                return { res: false, message: "A file with the same name exists" };
            }
        }
        for (let folder of this.subFolders) {
            if (folder.name === name) {
                return { res: false, message: "A folder with the same name exists" };
            }
        }
        return { res: true, message: "Name is unique" };
    }

    addFolder(folder) {
        if (!(folder instanceof Folder)) return;

        const nameCheck = this.isNameUnique(folder.name);
        if (!nameCheck.res) {
            return nameCheck;
        }

        folder.path = `${this.path}/${folder.name}`;
        folder.lastModificationOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = folder.lastModificationOn;
        this.size += folder.size;

        this.subFolders.push(folder);
        return { res: true, message: "Folder added successfully" };
    }

    addFile(file) {
        if (!(file instanceof File)) return;

        const nameCheck = this.isNameUnique(file.name);
        if (!nameCheck.res) {
            return nameCheck;
        }

        file.path = `${this.path}/${file.name}`;
        file.lastModified = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = file.lastModified;
        this.size += file.size;

        this.subFiles.push(file);
        return { res: true, message: "File added successfully" };
    }

    delete() {
        for (let file of this.subFiles) {
            file.delete();
        }
        for (let folder of this.subFolders) {
            folder.delete();
        }

        if (this.parent) {
            this.parent.subFolders = this.parent.subFolders.filter(folder => folder !== this);
            this.parent.lastModificationOn = TimeHelper.getCurrentDateTime();
            this.parent.size -= this.size;
        }

        return { res: true, message: "Deleted successfully" };
    }
}
