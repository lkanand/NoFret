import React from "react";
import ".Line.css";
import Snote from "../Snote";

const Line = props => (
  <div className={props.lineNumber}>
	  <Snote{
	  	note:{props.note}
	  	position="s1"
	  	slbmnumber=`${props.lbmnumber}-s1`}></Snote>
	  <Snote{position="s2"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s2`}></Snote>
	  <Snote{position="s3"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s3`}></Snote>
	  <Snote{position="s4"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s4`}></Snote>
	  <Snote{position="s5"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s5`}></Snote>
	  <Snote{position="s6"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s6`}></Snote>
	  <Snote{position="s7"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s7`}></Snote>
	  <Snote{position="s8"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s8`}></Snote>
	  <Snote{position="s9"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s9`}></Snote>
	  <Snote{position="s10"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s10`}></Snote>
	  <Snote{position="s11"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s11`}></Snote>
	  <Snote{position="s12"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s12`}></Snote>
	  <Snote{position="s13"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s13`}></Snote>
	  <Snote{position="s14"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s14`}></Snote>
	  <Snote{position="s15"
	  note:{props.note}
	slbmnumber=`${props.lbmnumber}-s15`}></Snote>
	  <Snote{position="s16"
	  note:{props.note}
	  slbmnumber=`${props.lbmnumber}-s16`}></Snote>
  </div>
);

export default Line;