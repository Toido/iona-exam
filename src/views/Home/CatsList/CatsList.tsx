import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContextType, ICatDetails } from 'src/@types/AppTypes';
import { fetchCatImages } from 'src/apis/cats';
import ImageCard from 'src/components/ImageCard/ImageCard';
import AppContext from 'src/contexts/AppContext';
import { StyledButton } from './styles';

const CatsListContent = ({ catList }: { catList: ICatDetails[] }) => {
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/${id}`);
  };

  const renderButton = (id: string) => {
    return <Button onClick={() => handleViewDetail(id)}>View Details</Button>;
  };

  return (
    <Row>
      {catList.map((cat, index) => {
        return (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <ImageCard imageUrl={cat.url} body={renderButton(cat.id)} />
          </Col>
        );
      })}
    </Row>
  );
};

const CatsList = () => {
  const { selectedBreed, search, setSearch } = useContext(
    AppContext,
  ) as AppContextType;
  const [catList, setCatList] = useState<ICatDetails[]>([]);
  const [hasMoreRes, setHasMoreRes] = useState(false);
  const [uniqueIds, setUniqueIds] = useState<Set<string>>(new Set());
  const uniqueIdRef = useRef<Set<string>>(uniqueIds);

  useEffect(() => {
    uniqueIdRef.current = uniqueIds;
  }, [uniqueIds]);

  useEffect(() => {
    // Fetch images of selected breed
    const fetchImages = async () => {
      const res = await fetchCatImages(search.page, selectedBreed.id);

      // Filter duplicate id
      const uniqueRes = res.data.filter((res: ICatDetails) => {
        return !uniqueIdRef.current.has(res.id);
      });

      if (uniqueIdRef.current.size === 0) {
        setCatList(prevData => [...prevData, ...res.data]);
        setUniqueIds(
          prevIds =>
            new Set([
              ...prevIds,
              ...res.data.map((item: ICatDetails) => item.id),
            ]),
        );
      } else if (uniqueRes.length > 0) {
        setCatList(prevData => [...prevData, ...uniqueRes]);
        setUniqueIds(
          prevIds =>
            new Set([
              ...prevIds,
              ...uniqueRes.map((item: ICatDetails) => item.id),
            ]),
        );
      } else {
        // No new unique IDs, hide the load more button
        console.log('no more');

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
      <StyledButton
        variant="success"
        onClick={() => {
          setSearch({ page: search.page + 1 });
        }}
      >
        Load more
      </StyledButton>
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
