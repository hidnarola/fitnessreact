import React, { Component } from "react";
import PhotoCard from "./PhotoCard";
import Slick from "react-slick";
import img1 from "../../../../assets/img/progress/img1-3x.png";
import img2 from "../../../../assets/img/progress/img2-3x.png";
import img3 from "../../../../assets/img/progress/img3-3x.png";
import img4 from "../../../../assets/img/progress/img4-3x.png";
import img5 from "../../../../assets/img/progress/img5-3x.png";
import img6 from "../../../../assets/img/progress/img6-3x.png";
import img7 from "../../../../assets/img/progress/img7-3x.png";
import img8 from "../../../../assets/img/progress/img8-3x.png";
import img9 from "../../../../assets/img/progress/img9-3x.png";
import img10 from "../../../../assets/img/progress/img10-3x.png";
import img11 from "../../../../assets/img/progress/img11-3x.png";
import img12 from "../../../../assets/img/progress/img12-3x.png";
import img13 from "../../../../assets/img/progress/img13-3x.png";

class PhotosViewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosList: [
        {
          images: [img9, img2, img3, img10, img9, img8, img6, img5, img11],
          description:
            "Lectus nam lectus eu blandit ac 🔪 hendrerit 👺 nibh nisi 🐙 posuere ac cras ornare facilisis lectus fermentum ultricies sapien et laoreet velit ut 👦 urna viverra et at risus, quam phasellus mauris a nullam adipiscing consequat. Facilisis in at pellentesque elit justo quis amet auctor feugiat turpis nunc, nunc, nulla mattis platea purus ut. Leo lectus massa mattis quisque sed 💩 id orci id elit tempor felis adipiscing vel id consectetur in condimentum 🌞 auctor a diam ut nunc ornare auctor aliquam duis lacus"
        },
        {
          images: [img1, img3, img7],
          description:
            "🌒 habitant tortor neque lacinia risus pellentesque venenatis sodales viverra in felis massa aliquet diam egestas venenatis, turpis diam vivamus sagittis donec nunc lacinia feugiat volutpat tincidunt sed placerat. Vitae leo"
        },
        {
          images: [img9],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        },
        {
          images: [img12, img6, img5],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        },
        {
          images: [img13],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        },
        {
          images: [img2, img6, img8, img4, img7, img11],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        }
      ]
    };
  }
  render() {
    const { photosList } = this.state;
    return (
      <div className="row display-blog-photos m-2">
        {photosList.map((item, k) => (
          <div className="no-gutters col-md-4">
            <PhotoCard
              key={k}
              photo={item}
              swipingTransitionDuration={
                Math.floor(Math.random() * 5000) + 2000
              }
              slideInterval={Math.floor(Math.random() * 5000) + 1000}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default PhotosViewContent;
