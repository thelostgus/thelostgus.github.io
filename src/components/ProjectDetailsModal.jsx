import React, { Component, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";
import {useObjectState} from "../hooks"

const technology = (icon, i) => (
  <li className="list-inline-item mx-3" key={i}>
    <span>
      <div className="text-center">
        <i className={icon.class} style={{ fontSize: "300%" }}>
          <p className="text-center" style={{ fontSize: "30%" }}>
            {icon.name}
          </p>
        </i>
      </div>
    </span>
  </li>
)

const image = (img, i) => <div key={i} data-src={img} />

const ProjectDetailsModal = ({show, onHide, data}) => {
  const [images, setImages] = useState([])
  const [technologies, setTecnologies] = useState([])
  const [basicInfos, setBasicInfos] = useObjectState({title: "", description: "", url: ""})

  useEffect(() => {
    if(!!data){
      setImages(data.images)
      setTecnologies(data.technologies)
      setBasicInfos({
        title: data.title,
        description: data.description,
        url: data.url
      })
    }
  }, [data])

  return (
    <Modal
      show={show}
      onHide={onHide}
      data={data}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-inside"
    >
      <span onClick={onHide} className="modal-close">
        <i className="fas fa-times fa-3x close-icon"></i>
      </span>
      <div className="col-md-12">
        <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
          <div className="slider-tab">
            <span
              className="iconify slider-iconfiy"
              data-icon="emojione:red-circle"
              data-inline="false"
              style={{ marginLeft: "5px" }}
            ></span>{" "}
            &nbsp;{" "}
            <span
              className="iconify slider-iconfiy"
              data-icon="twemoji:yellow-circle"
              data-inline="false"
            ></span>{" "}
            &nbsp;{" "}
            <span
              className="iconify slider-iconfiy"
              data-icon="twemoji:green-circle"
              data-inline="false"
            ></span>
          </div>
          <AwesomeSlider
            cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
            animation="scaleOutAnimation"
            className="slider-image"
          >
            {
              !!images && images.map(image)
            }
          </AwesomeSlider>
        </div>
        <div className="col-md-10 mx-auto">
          <h3 style={{ padding: "5px 5px 0 5px" }}>
            {
              basicInfos.title
            }
            {
            !!basicInfos.url && (
            <a href={basicInfos.url} target="_blank" rel="noopener noreferrer" className="link-href" >
              <i className="fas fa-external-link-alt" style={{ marginLeft: "10px" }} />
            </a>
            )
            }
          </h3>
          <p className="modal-description">{basicInfos.description}</p>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto">
              {
                !!technologies && technologies.map(technology)
              }
              </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default ProjectDetailsModal;
