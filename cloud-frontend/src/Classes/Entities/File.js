import TimeHelper from "../Helpers/TimeHelper";

export default class File {
    constructor(name, parentFolder = null) {
        if (!name) {
            throw new Error("File name cannot be empty.");
        }

        this.name = name;
        this.parentFolder = parentFolder;
        this.path = parentFolder ? `${parentFolder.path}/${this.name}` : this.name;

        // Default properties
        this.size = 0; // Size in KB
        this.isDir = false;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.lastModificationOn = this.createdOn;

        // Add file to the parent folder if applicable
        if (this.parentFolder) {
            const validation = this.parentFolder.isNameUnique(this.name);
            if (!validation.res) {
                throw new Error(validation.message);
            }
            this.parentFolder.size += this.size;
            this.parentFolder.subFiles.push(this)
        }
    }

    delete() {
        if (this.parentFolder) {
            // Remove the file from the parent's subFiles array
            this.parentFolder.subFiles = this.parentFolder.subFiles.filter(file => file !== this);

            // Update the parent's size and modification date
            this.parentFolder.size -= this.size;
            this.parentFolder.lastModificationOn = TimeHelper.getCurrentDateTime();
        }

        return { res: true, message: "File deleted successfully" };
    }
}
