import { Card, CardContent, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

function HomePage() {
  return (
    <>
      <Card>
        <CardContent sx={{ margin: "20px" }}>
          <Typography variant="h2" component="h1">
            Hello
          </Typography>
          <Typography
            sx={{ paddingBlock: "10px" }}
            variant="body1"
            component="p"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            suscipit officia minus et eum, nam accusamus! Aliquid, facere.
            Magnam mollitia temporibus consequuntur ipsum sed expedita
            reprehenderit iure porro suscipit excepturi?
          </Typography>
          <Typography
            sx={{
              paddingBlock: "10px",
              paddingInline: "10px",
              color: "white",
              backgroundColor: red.A400,
              width: "100%",
            }}
            variant="body1"
            component="p"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            voluptas aspernatur officiis doloribus tenetur itaque expedita quo?
            Doloremque a iusto eum placeat distinctio vitae totam.
          </Typography>
          <Typography
            sx={{ paddingBlock: "10px" }}
            variant="body2"
            component="p"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
            pariatur tempore doloremque in debitis suscipit reiciendis dolorum,
            voluptatibus magni animi, excepturi, repellendus ea. Placeat quaerat
            explicabo aspernatur, officia aut laborum iusto, dolore magnam
            minus, laboriosam cumque ad debitis sapiente repudiandae eaque
            similique totam ipsum. Delectus itaque atque inventore, qui, numquam
            sed quis, animi mollitia modi doloremque similique aliquam
            distinctio incidunt quidem illo consectetur dicta nulla? Itaque, ea
            totam, repudiandae cupiditate ipsam at dolores, molestias aut
            aperiam error officia rerum architecto. Exercitationem impedit iure
            molestias, repellendus nam fuga odio accusantium nesciunt odit
            magnam, libero non debitis, laboriosam nulla possimus cum amet.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default HomePage;
