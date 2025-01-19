"use client";

import { useState } from "react";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import "./Accordion.css";
import Link from "next/link";
import { accordion } from "../card-produse/cardList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = useState<string | false>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("expandedPanel") || false;
    }
    return false;
  });

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    sessionStorage.setItem("expandedPanel", isExpanded ? panel : "");
  };

  return (
    <div className="accordion-categories-width">
      <h3 className="categoriesheader">Categorii</h3>
      {accordion.map((e, index) => {
        const panel = `panel${index + 1}`;
        return (
          <Accordion
            key={index}
            expanded={expanded === panel}
            onChange={handleChange(panel)}
          >
            <Link href={`/${Object.keys(e)[0]}`}>
              <MuiAccordionSummary
                aria-controls={`${panel}-content`}
                id={`${panel}-header`}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className="accordion-typography">
                  {Object.keys(e)[0].split("-").join(" ")}
                </Typography>
              </MuiAccordionSummary>
            </Link>
          </Accordion>
        );
      })}
    </div>
  );
}
