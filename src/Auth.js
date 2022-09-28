import { useEffect, useState } from "react";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { FormLayout, TextField } from "@shopify/polaris";
import {Spinner} from '@shopify/polaris';
const Auth = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(false);
  const [flag, setflag] = useState("");
  const [fetchedToken, setFetchedtoken] = useState("");
  let token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA";
  var options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
  };
  const validateDetails = () => {
    fetch(
      `https://fbapi.sellernext.com/user/login?username=${userName}&password=${password}`,
      options
    )
      .then((result) => result.json())
      .then((json) => setFetchedtoken(json));
      setLoading(true)
      setflag("");
  };
  useEffect(() => {
    fetchedToken.success
      ? sessionStorage.setItem("token",fetchedToken.data.token)
      : setflag(fetchedToken.message);setLoading(false);
  }, [fetchedToken]);
  console.log(loading)
  return (
    <>
      {fetchedToken.success && <Navigate to="/dashboard" replace={true} />}
      <div className="main_div">
        <FormLayout>
          <TextField
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e)}
          />
          <TextField
            type="text"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e)}
          />
          {loading === false ?  <button onClick={validateDetails} className="Polaris-Button">
            Submit
          </button> :
          <Spinner accessibilityLabel="Spinner example" size="large" />}
        </FormLayout>
        {fetchedToken.success ? "" : <h3>{flag}</h3>}
      </div>
    </>
  );
};

export default Auth;
