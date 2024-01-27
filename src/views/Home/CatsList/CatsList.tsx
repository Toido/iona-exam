import { useContext, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContextType, ICatDetails } from 'src/@types/AppTypes';
import { fetchCatImages } from 'src/apis/cats';
import AppContext from 'src/contexts/AppContext';
import { StyledButton } from './styles';
import CatsListContent from './component/CatsListContent';
import Loading from 'src/components/Loading/Loading';
import AlertContext from 'src/contexts/AlertContext';

const CatsList = () => {
  const { setAlert } = useContext(AlertContext);
  const { selectedBreed, setSelectedBreed } = useContext(
    AppContext,
  ) as AppContextType;
  const [catList, setCatList] = useState<ICatDetails[]>([]);
  const [hasMoreRes, setHasMoreRes] = useState(false);
  const [uniqueIds, setUniqueIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const uniqueIdRef = useRef<Set<string>>(uniqueIds);
  const [searchParams] = useSearchParams();
  const breedParam = searchParams.get('breed');

  useEffect(() => {
    uniqueIdRef.current = uniqueIds;
  }, [uniqueIds]);

  useEffect(() => {
    if (breedParam) setSelectedBreed(breedParam);
  }, [breedParam]);

  useEffect(() => {
    // Fetch images of selected breed
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const res = await fetchCatImages(page, selectedBreed);

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
          setHasMoreRes(false);
        }
        setIsLoading(false);
      } catch (e) {
        console.log({ e });
        setIsLoading(false);
        setAlert({
          bodyMessage:
            'Apologies but we could not load new cats for you at this time! Miau!',
          show: true,
          variant: 'warning',
        });
      }
    };

    if (selectedBreed !== '') {
      fetchImages();
    }
  }, [page, selectedBreed]);

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

    if (isLoading) {
      return (
        <StyledButton variant="success" disabled>
          <Loading text="Fetching cats..." />
        </StyledButton>
      );
    }

    return (
      <StyledButton
        variant="success"
        onClick={() => {
          setPage(page + 1);
        }}
        disabled={selectedBreed === ''}
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
