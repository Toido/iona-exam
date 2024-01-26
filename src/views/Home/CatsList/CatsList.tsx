import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContextType, ICatDetails } from 'src/@types/AppTypes';
import { fetchCatImages } from 'src/apis/cats';
import AppContext from 'src/contexts/AppContext';
import { StyledButton } from './styles';
import CatsListContent from './component/CatsListContent';

const CatsList = () => {
  const { selectedBreed } = useContext(AppContext) as AppContextType;
  const [catList, setCatList] = useState<ICatDetails[]>([]);
  const [hasMoreRes, setHasMoreRes] = useState(false);
  const [uniqueIds, setUniqueIds] = useState<Set<string>>(new Set());
  const uniqueIdRef = useRef<Set<string>>(uniqueIds);
  const [searchParams] = useSearchParams();
  const breedParam = searchParams.get('breed');
  const [page, setPage] = useState(1);

  useEffect(() => {
    uniqueIdRef.current = uniqueIds;
  }, [uniqueIds]);

  useEffect(() => {
    // Fetch images of selected breed
    const fetchImages = async () => {
      const breedId = breedParam ?? selectedBreed.id;
      const res = await fetchCatImages(page, breedId);

      // Filter duplicate id
      const uniqueRes = res.data.filter((res: ICatDetails) => {
        return !uniqueIdRef.current.has(res.id);
      });

      console.log({ catList, uniqueRes, uniqueIdRef });

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
        setHasMoreRes(false);
      }
    };

    if (selectedBreed.id !== '' || breedParam !== '') {
      fetchImages();
    }
  }, [page, selectedBreed, breedParam]);

  useEffect(() => {
    return () => {
      setCatList([]);
      setUniqueIds(new Set());
      setHasMoreRes(false);
    };
  }, [selectedBreed, breedParam]);

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
          setPage(page + 1);
        }}
      >
        Load more
      </StyledButton>
    );
  };

  return (
    <>
      <CatsListContent catList={catList} />
      {renderLoadMore()}
    </>
  );
};

export default CatsList;
