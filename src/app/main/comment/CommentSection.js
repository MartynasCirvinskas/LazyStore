import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

function CommentSection({ product }) {
    const [comments, setComments] = useState(product.comments || []);
    const [newComment, setNewComment] = useState("");

    const handleAddComment = () => {
        const comment = {
            text: newComment,
            date: new Date().toISOString(),
        };
        setComments([...comments, comment]);
        setNewComment("");
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
