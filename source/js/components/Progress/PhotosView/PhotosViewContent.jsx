import React, { Component } from "react";
import PhotoCard from "./PhotoCard";
import Slick from "react-slick";
import img1 from "../../../../assets/img/progress/img1.jpg";
import img2 from "../../../../assets/img/progress/img2.jpg";
import img3 from "../../../../assets/img/progress/img3.jpg";
import img4 from "../../../../assets/img/progress/img4.jpg";
import img5 from "../../../../assets/img/progress/img5.jpg";
import img6 from "../../../../assets/img/progress/img6.jpg";
import img7 from "../../../../assets/img/progress/img7.jpg";
import img8 from "../../../../assets/img/progress/img8.jpg";
import img9 from "../../../../assets/img/progress/img9.jpg";
import img10 from "../../../../assets/img/progress/img10.jpg";
import img11 from "../../../../assets/img/progress/img11.jpg";
import img12 from "../../../../assets/img/progress/img12.jpg";
import img13 from "../../../../assets/img/progress/img13.jpg";
import img14 from "../../../../assets/img/progress/img14.jpg";
import img15 from "../../../../assets/img/progress/img15.jpg";
import img16 from "../../../../assets/img/progress/img16.jpg";

class PhotosViewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photosList: [
        {
          images: [img9, img2, img3, img10, img14, img8, img6, img5, img11],
          description:
            "Lectus nam lectus eu blandit ac 🔪 hendrerit 👺 nibh nisi 🐙 posuere ac cras ornare facilisis lectus fermentum ultricies sapien et laoreet velit ut 👦 urna viverra et at risus, quam phasellus mauris a nullam adipiscing consequat. Facilisis in at pellentesque elit justo quis amet auctor feugiat turpis nunc, nunc, nulla mattis platea purus ut. Leo lectus massa mattis quisque sed 💩 id orci id elit tempor felis adipiscing vel id consectetur in condimentum 🌞 auctor a diam ut nunc ornare auctor aliquam duis lacus"
        },
        {
          images: [img1, img3, img7],
          description:
            "🌒 habitant tortor neque lacinia risus pellentesque venenatis sodales viverra in felis massa aliquet diam egestas venenatis, turpis diam vivamus sagittis donec nunc lacinia feugiat volutpat tincidunt sed placerat. Vitae leo"
        },
        {
          images: [img13],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus.🌒 habitant tortor neque lacinia risus pellentesque venenatis sodales viverra in felis massa aliquet diam egestas venenatis, turpis diam vivamus sagittis donec nunc lacinia feugiat volutpat tincidunt sed placerat. Vitae leo"
        },
        {
          images: [img12, img6, img5],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        },
        {
          images: [img16],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus.🌒 habitant tortor neque lacinia risus pellentesque venenatis sodales viverra in felis massa aliquet diam egestas venenatis, turpis diam vivamus sagittis donec nunc lacinia feugiat volutpat tincidunt sed placerat. Vitae leo"
        },
        {
          images: [img6, img5, img8, img4, img7, img11],
          description:
            "pellentesque in 🐁 donec mi 🍷 sed id nisl aliquet ac, ut varius felis risus dolor rhoncus"
        }
      ]
    };
  }
  render() {
    const { photosList } = this.state;
    return (
      <div className="row no-gutters display-blog-photos p-2">
        {photosList.map((item, k) => (
          <div className="col-md-4" key={k}>
            <PhotoCard key={k} photo={item} />
          </div>
        ))}
      </div>
    );
  }
}

export default PhotosViewContent;
