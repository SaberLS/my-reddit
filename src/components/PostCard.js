import React from "react";
import { Card, CardBody, CardHeader, Box, Heading } from "grommet";

export default function PostCard({ post, body }) {
    const height = (post.mediaType === "link") ? "small" : "large";

    return (
        <Box align="center">
            <Card
                name="Post"
                direction="column"
                margin={{ top: "medium" }}
                height={height}
                width="large"
            >
                <CardHeader
                    direction="row"
                    justify="between"
                    pad="small"
                    align="center"
                >
                    <Box
                        onClick={() => window.open(`https://reddit.com${post.redditLink}`)}
                        justify="start"
                        align="start"
                        fill="horizontal"
                        overflow="auto"
                    >
                        <Heading style={{ whiteSpace: "nowrap" }} level="2">
                            {post.title}
                        </Heading>
                    </Box>
                </CardHeader>
                <CardBody pad="small">
                    {body}
                </CardBody>
            </Card>
        </Box>
    );
}