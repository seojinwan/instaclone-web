import { Helmet } from "react-helmet-async";
import React from "react";
import PropTypes from "prop-types";

PageTitle.propTypes = {
  title: PropTypes.string,
};

function PageTitle({ title }) {
  return (
    <Helmet>
      <title>{title} | instaClone</title>
    </Helmet>
  );
}

export default PageTitle;
