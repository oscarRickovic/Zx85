import TimeHelper from "../Helpers/TimeHelper";

export default class File {
    constructor(name) {
        this.name = name;
        this.subFolders = [];
        this.subFiles = [];
        this.size = 0;
        this.isDir = false;
        this.createdOn = TimeHelper.getCurrentDateTime();
        this.modifiedOn = TimeHelper.getCurrentDateTime();
    }
}