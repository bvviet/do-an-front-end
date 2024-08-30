import { Dialog, DialogContent, IconButton } from "@mui/material";
import { ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    selectedValue: string;
    content: ReactNode;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({ open, onClose, selectedValue, content }) => {
    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogContent>
                <div className="relative">
                    {/* Nút đóng */}
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        style={{ position: "absolute", right: 0, top: 0 }}
                    >
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                    {/* Nội dung */}
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SimpleDialog;
