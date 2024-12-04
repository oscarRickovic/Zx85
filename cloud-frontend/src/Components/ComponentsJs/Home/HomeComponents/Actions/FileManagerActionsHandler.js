import Folder from "../../../../../Classes/Entities/Folder"
import File from "../../../../../Classes/Entities/File"
export default class FileManagerActionsHandler {
    constructor(Variables, Functions) {
        this.Variables = Variables;
        this.Functions = Functions;
    }
    static getData() {
        // Initial setup
        let Root = new Folder();
        let Home = new Folder("Home", Root);
        let Documents = new Folder("Documents", Root);
        let Desktop = new Folder("Desktop", Root);
        let music = new Folder("music", Documents);
        let abdelhadi = new File("abdelhadi", Desktop);
        let abdelhadi2 = new File("abdelhadi", Root);
        return {
            Root, Home, Documents, Desktop, music, abdelhadi, abdelhadi2
        }
    }

    handleRightClick = (e, item = null, emptySpace = false) => {
        e.preventDefault();
        this.Functions.setSelectedItem(item);
        this.Functions.setIsEmptySpace(emptySpace);
        this.Functions.setMenuPosition({ x: e.clientX, y: e.clientY - 80 });
        this.Functions.setMenuVisible(true);
    };

    handleClickOutside = (e) => {
        if (this.Variables.menuVisible && !e.target.closest(".context-menu")) {
            this.Functions.setMenuVisible(false);
        }
    };

    handleCreateAction = () => {
        this.Functions.setIsCreatingFolder(true);
        this.Functions.setNewFolderName("");
        this.Functions.setMenuVisible(false);
    };

    handleNewFolderCreation = (e) => {
        if (e.key === "Enter" && this.Variables.newFolderName.trim()) {
            const newFolder = new Folder(this.Variables.newFolderName.trim(), this.Variables.workingDirectory);
            this.Variables.workingDirectory.addFolder(newFolder);
            this.Functions.setIsCreatingFolder(false);
            this.Functions.setNewFolderName("");
        } else if (e.key === "Escape") {
            this.Functions.setIsCreatingFolder(false);
            this.Functions.setNewFolderName("");
        }
    };

    handleAction = (action) => {
        if (action === "Create") {
            this.handleCreateAction();
        }
        if (action === "Delete") {
          this.Variables.selectedItem.delete();
        }
        if(action == "Open") {
            this.Functions.setWorkingDirectory(this.Variables.selectedItem)
        }
        // Other actions here
        this.Functions.setMenuVisible(false);
    };

    handleMouseMove = (e) => {
        try {
            const containerWidth = e.target.parentElement.offsetWidth; // Get the container width
            const newDividerPosition = (e.clientX / containerWidth) * 100; // Calculate new width percentage
            if (this.Variables.newDividerPosition > 10 && this.Variables.newDividerPosition < 90) { // Restrict resizing to reasonable bounds
                this.Functions.setDividerPosition(newDividerPosition);
            }
        } catch(error) {
            // do nothing
        }
    };
}