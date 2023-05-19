import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { addCommentToProduct } from "../store/productSlice";
import { useDispatch } from "react-redux";
import { selectProduct } from "../store/productSlice";
import { useSelector } from "react-redux";
import { removeCommentFromProduct } from "../store/productSlice";

function CommentSection({ product }) {
    const [newComment, setNewComment] = useState("");
    const dispatch = useDispatch();
    const productInStore = useSelector(selectProduct);
    const comments = productInStore.comments || [];

    const handleAddComment = () => {
        const comment = {
            text: newComment,
            date: new Date().toISOString(),
        };
        dispatch(
            addCommentToProduct({ productId: product.product_id, comment }),
        );
        setNewComment("");
    };

    const handleRemoveComment = (index) => {
        dispatch(
            removeCommentFromProduct({ productId: product.product_id, index }),
        );
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <List>
                    {comments.map((comment, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={comment.text}
                                secondary={new Date(
                                    comment.date,
                                ).toLocaleString()}
                            />
                            <Button onClick={() => handleRemoveComment(index)}>
                                Remove Comment
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    label="Add Comment"
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddComment}
                >
                    Add Comment
                </Button>
            </Grid>
        </Grid>
    );
}

export default CommentSection;
