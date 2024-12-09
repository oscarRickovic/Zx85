import Folder from "../../../../../Classes/Entities/Folder"
import File from "../../../../../Classes/Entities/File"
import axios from 'axios';
export default class FileManagerActionsHandler {
    constructor(Variables, Functions) {
        this.Variables = Variables;
        this.Functions = Functions;
    }
    static async getData() {
        const Root = new Folder(); // Create the Root folder
        const folderTree = await this.fetchFolderStructure(); // Fetch folder structure from the backend
        this.populateFolderTree(folderTree, Root); // Populate the tree starting from Root
        return { Root };
    }

    static async fetchFolderStructure() {
        try {
            const response = await axios.get('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + '/api/storage/structure');
            return response.data; // Return the storage structure
        } catch (error) {
            console.error("Error fetching Storage structure:", error);
            return null; // Return null or handle the error appropriately
        }
    }

    static populateFolderTree(treeNode, parentFolder) {
        if (!treeNode) return;
    
        // Iterate through children of the current treeNode
        treeNode.children.forEach(child => {
            if (child.type === 'folder') {
                const folder = new Folder(child.name, parentFolder);
                parentFolder.addFolder(folder); // Add the folder to the parent
                this.populateFolderTree(child, folder); // Recursively populate the folder
            } else if (child.type === 'file') {
                const file = new File(child.name, parentFolder);
                parentFolder.addFile(file); // Add the file to the parent
            }
        });
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
        if(! this.Variables.isRenaming) {
            this.Functions.setSelectedItem(null)
        }
    };

    handleCreateAction = () => {
        this.Functions.setIsCreatingFolder(true);
        this.Functions.setNewFolderName("");
        this.Functions.setMenuVisible(false);
    };

    handleNewFolderCreation = async (e) => {
        if (e.key === "Enter" && this.Variables.newFolderName.trim()) {
            if(this.Variables.newFolderName.length > 20) return;
            let folderPath = this.Variables.workingDirectory.path + "/" + this.Variables.newFolderName.trim();
            try {
                const response = await axios.post('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + "/api/storage/createFolder", {
                    folderPath, // Pass folder path as the body
                });
                const newFolder = new Folder(this.Variables.newFolderName.trim(), this.Variables.workingDirectory);
                this.Variables.workingDirectory.addFolder(newFolder);
                alert("Folder created successfully!");
            } catch (error) {
                console.error("Error creating folder:", error.response?.data || error.message);
                alert("Error creating folder: " + (error.response?.data.message || error.message));
            }
            this.Functions.setIsCreatingFolder(false);
            this.Functions.setNewFolderName("");
        } else if (e.key === "Escape") {
            this.Functions.setIsCreatingFolder(false);
            this.Functions.setNewFolderName("");
        }
    };

    handleRenameInput = () => {
        this.Functions.setIsRenaming(true);
        this.Functions.setNewName("");
        this.Functions.setMenuVisible(false);
    } 

    handleRenaming = (e) => {
        if (e.key === "Enter" && this.Variables.newName.trim()) {
            if(this.Variables.newName.length > 20) return;
            this.Variables.selectedItem.rename(this.Variables.newName);
            this.Functions.setIsRenaming(false);
            this.Functions.setNewName("");
            this.Functions.setSelectedItem(null);
        } else if (e.key === "Escape") {
            this.Functions.setIsRenaming(false);
            this.Functions.setNewName("");
            this.Functions.setSelectedItem(null);
        }
    }

    handleDeletingOperation = async (selectElement) => {
        const relativePath = selectElement.path
        alert(relativePath)
        try {
                await axios.post('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + "/api/storage/delete", {
                    relativePath, // Pass folder path as the body
                });
                selectElement.delete();
                alert("DELETED SUCCESSFULLY")
            } catch (error) {
                console.error("Error creating folder:", error.response?.data || error.message);
                alert("Error creating folder: " + (error.response?.data.message || error.message));
            }
    }

    handleAction = async (action) => {
        if (action === "Create") {
            await this.handleCreateAction();
        }
        if (action === "Delete") {
            await this.handleDeletingOperation(this.Variables.selectedItem)
        }
        if (action === "Open") {
            const selectedFolder = this.Variables.selectedItem;
            if (selectedFolder && selectedFolder.isDir) {
                this.Functions.setWorkingDirectory(selectedFolder);
            } else {
                alert("Cannot open a file. Please select a folder.");
            }
        }
        if(action == "Rename") {
            this.handleRenameInput();
        }
        if (action === "Download") {
            this.handleDownload(); 
        }
        // Other actions here
        this.Functions.setMenuVisible(false);
    };

    handleMouseMove = (e) => {
        try {
            const containerWidth = e.target.parentElement.offsetWidth; // Get the container width
            const newDividerPosition = (e.clientX / containerWidth) * 100; // Calculate new width percentage
            if (newDividerPosition > 10 && newDividerPosition < 90) { // Restrict resizing to reasonable bounds
                this.Functions.setDividerPosition(newDividerPosition);
            }
        } catch(error) {
            // do nothing
        }
    };

    handleFileUpload = async (e) => {
        const selectedFile = e.target.files[0];  // Get the file from the input
        if (!selectedFile) {
            this.Functions.setUploadStatus('Please choose a file to upload');
            return;
        }
        alert("working")

        // Update file state with selected file
        this.Functions.setFile(selectedFile);

        const formData = new FormData();
        formData.append('folderPath', this.Variables.workingDirectory.path);
        formData.append('file', selectedFile);  // Append the selected file to the FormData
        
        try {
            this.Functions.setUploadStatus('Uploading...');

            // Send the file to the backend using POST request
            const response = await axios.post('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + '/service/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            this.Variables.workingDirectory.addFile(new File(selectedFile.name, this.Variables.workingDirectory))
            // If the upload is successful
            this.Functions.setUploadStatus('File uploaded successfully!');
            console.log(response.data);
        } catch (error) {
            this.Functions.setUploadStatus('Error uploading file');
            console.error(error);
        }
    }

    handleDownload = async () => {
        if (!this.Variables.selectedItem) {
            alert("No file selected for download.");
            return;
        }
    
        if (this.Variables.selectedItem.isDir) {
            alert("Cannot download a folder. Please select a file.");
            return;
        }
    
        try {
            console.log("Selected Item Path: ", this.Variables.selectedItem.path);

            const response = await axios.get('http://' + process.env.REACT_APP_SERVER_IP + ':' + process.env.REACT_APP_SERVER_PORT + `/service/download`, {
                params: { path: this.Variables.selectedItem.path }, // Send the file path to the backend
                responseType: 'blob', // Ensure the response is handled as a binary file
            });

            console.log("Response: ", response);
    
            // Create a link to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", this.Variables.selectedItem.name); // Set the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading the file:", error);
            alert("Failed to download the file.");
        }
    };
    
    
}