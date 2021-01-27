import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function Dashboard() {
  const classes = useStyles();
  const [apiResponse, setApiResponse] = useState({ pizzas: [] });

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setApiResponse({ pizzas: res });
      });
  }, []);

  return (
    <div>
      <Grid container className={classes.root}>
        {apiResponse.pizzas.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.name}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                  {item.size}
                </Typography>
                <Typography variant="body2" component="p">
                  {item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Add to cart</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
