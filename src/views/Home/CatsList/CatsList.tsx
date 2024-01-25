import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, CardBody, CardImg, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ICatImages } from 'src/@types/AppTypes';
import { fetchCatImages } from 'src/apis/cats';
import AppContext from 'src/contexts/AppContext';

const CatsListContent = ({ catList }: { catList: ICatImages[] }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <Row>
      {catList.map((cat, index) => {
        return (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardImg variant="top" src={cat.url} />
              <CardBody>
                <Button onClick={() => handleViewDetail(cat.id)}>
                  View Details
                </Button>
              </CardBody>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

const CatsList = () => {
  const { selectedBreed, search, setSearch } = useContext(AppContext);
  const [catList, setCatList] = useState<ICatImages[]>([]);
  const [hasMoreRes, setHasMoreRes] = useState(false);
  const [uniqueIds, setUniqueIds] = useState<Set<string>>(new Set());
  const uniqueIdRef = useRef<Set<string>>(uniqueIds);

  useEffect(() => {
    uniqueIdRef.current = uniqueIds;
  }, [uniqueIds]);

  useEffect(() => {
    // Fetch images of selected breed
    const fetchImages = async () => {
      console.log('here');

      const res = await fetchCatImages(search.page, selectedBreed.id);

      // Filter duplicate id
      const uniqueRes = res.data.filter((res: ICatImages) => {
        return !uniqueIdRef.current.has(res.id);
      });

      if (uniqueIdRef.current.size === 0) {
        setCatList(prevData => [...prevData, ...res.data]);
        setUniqueIds(
          prevIds =>
            new Set([
              ...prevIds,
              ...res.data.map((item: ICatImages) => item.id),
            ]),
        );
      } else if (uniqueRes.length > 0) {
        setCatList(prevData => [...prevData, ...uniqueRes]);
        setUniqueIds(
          prevIds =>
            new Set([
              ...prevIds,
              ...uniqueRes.map((item: ICatImages) => item.id),
            ]),
        );
      } else {
        // No new unique IDs, hide the load more button
        setHasMoreRes(false);
      }
    };

    if (selectedBreed.id !== '') {
      fetchImages();
    }
  }, [search, selectedBreed]);

  useEffect(() => {
    return () => {
      setCatList([]);
      setUniqueIds(new Set());
      setHasMoreRes(false);
    };
  }, [selectedBreed]);

  useEffect(() => {
    setHasMoreRes(true);
  }, [catList]);

  const renderLoadMore = () => {
    if (!hasMoreRes) {
      return null;
    }

    return (
      <Button
        onClick={() => {
          setSearch({ page: search.page + 1 });
        }}
      >
        Load more
      </Button>
    );
  };

  if (selectedBreed.id === '') {
    return <h4>No cats available</h4>;
  }
  return (
    <>
      <CatsListContent catList={catList} />
      {renderLoadMore()}
    </>
  );
};

export default CatsList;
