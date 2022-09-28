import React, { useEffect, useState } from "react";
import { Page, Card, DataTable } from "@shopify/polaris";
import { Select } from "@shopify/polaris";
import { useCallback } from "react";
import { Text } from "@shopify/polaris";
import { Pagination } from "@shopify/polaris";
import { Frame, Loading } from "@shopify/polaris";
import { Spinner } from "@shopify/polaris";
const Dashboard = () => {
  var temp = [];
  const [fullApiData, setFullApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const [count, setCount] = useState(10);
  const [totalCount, setTotalcount] = useState(0);
  const [selected, setSelected] = useState(10);
  var token = sessionStorage.getItem("token");
  var options = {
    method: "POST",
    headers: {
      Authorization: token,
    },
  };

  // Fetching data from Api
  const getDataFromApi = () => {
    setLoading(true);
    fetch(
      `https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${activePage}1&count=${count}`,
      options
    )
      .then((result) => result.json())
      .then((json) => {
        setApiData(
          json.data.rows.map((i) => [
            i.id,
            i.catalog,
            i.shop_url,
            i.email,
            i.shopify_plan,
            i.updated_at,
            i.created_at,
          ])
        );
        setFullApiData(json);
        setLoading(false);
        setTotalcount(json.data.count);
      });
  };
  // Api Calling only for one time;
  useEffect(() => {
    getDataFromApi();
  }, []);

  const handleSelectChange = useCallback((value) => setSelected(value), []);
  const rows = [
    [
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
      <Select placeholder="Equal" value={selected} />,
    ],
    ...apiData,
  ];
  const options1 = [
    { label: "10", value: "10" },
    { label: "20", value: "20" },
    { label: "30", value: "30" },
  ];
  // Get Previous Data
  const getPreviousData = () => {
    if(count > 10)
    {
      setActivePage(Number(activePage) - Number(selected));
      setCount(Number(count) - Number(selected));
      getDataFromApi();
    }
  };
  // Get Next Data
  const getNextData = () => {
      setActivePage(Number(count));
      setCount(Number(count) + Number(selected));
      getDataFromApi();
  };
  return (
    <>
      <Page title="Data Grid...">
        <Text variant="headingLg" as="h4">
          Showing from {activePage + 1} to {count} of {totalCount} users
        </Text>
        <Card>
          <div className="filter_div">
            <div>
              <Pagination
                label="Results"
                hasPrevious
                onPrevious={getPreviousData}
                hasNext
                onNext={getNextData}
              />
            </div>
            <div>
              <Select
                placeholder="Rows per page"
                options={options1}
                onChange={handleSelectChange}
                value={selected}
              />
            </div>
          </div>
          {loading === false ? (
            <DataTable
              columnContentTypes={[
                "numeric",
                "numeric",
                "numeric",
                "numeric",
                "numeric",
              ]}
              headings={[
                "Userid",
                "Catalog",
                "Shop Domain",
                "Shop email",
                "Shop Plan Name",
                "Updated at",
                "Created at",
              ]}
              rows={rows}
            />
          ) : (
            <>
              <div style={{ height: "100px" }}>
                <Frame>
                  <Loading />
                </Frame>
              </div>
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </>
          )}
        </Card>
      </Page>
    </>
  );
};
export default Dashboard;
