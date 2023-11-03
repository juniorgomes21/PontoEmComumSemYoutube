import { useEffect, useState } from 'react';

//Header
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import SearchIcon from '@mui/icons-material/Search';
// Card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Button, CircularProgress } from '@mui/material';
import api from '../../services/apiAxios';

type Video = {
    id: number;
    ytId: string;
    title: string;
    file: string;
    docum: number;
    refs: [];
}

function ReloadRefs() {

    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [cards, setCards] = useState<Video[]>([]);
    const [listCards, setListCards] = useState<Video[]>([]);
    const [listDocNum, setListDocNum] = useState<number[]>([]);

    useEffect(() => {
        if(cards.length == 0) {
            apiGetIntens();
        }
        if (searchFun.length == 0) {
            if(cards.length != 0) {
                setListCards(cards);
            }
        }
        searchFun();
    }, [searchText])

    async function apiGetIntens() {
        setLoading(true);
        try {
            const resonse = await api.get('/myvideo/norefs');
            console.log("Dados recebidos:", resonse.data); //@debug
            setListCards(resonse.data);
            setCards(resonse.data);
            setLoading(false);
            
        } catch (e: any) {
            console.log(e);
        }
    }

    async function apiGetRef(docum: number) {
      listDocNum.push(docum);
      setListDocNum((list) => [...list, docum]);
      try {
        await api.get(`/myvideo/norefs?file_number=${docum}`);
        setTimeout(() => {
          apiGetIntens();
          setListDocNum((list) => list.filter((item) => item !== docum));
        }, 20000);
      } catch(e: any) {
        console.log(e.response);
      }
    }

    function searchFun() {
        try {
            if(!(searchText.length == 0)) {
                const allArray = cards;
                let newCards = allArray.filter(cards => (cards.title.toLowerCase().includes(searchText)));
                setListCards(newCards);
            }
            
        } catch (e: any) {
            console.log(e);
        }
    }

    function valid() {
        if(searchText === '') {
            setError(true);
        } else {
            searchFun();
            setError(false);
        }
    }

    function RenderRefs(card: Video) {
        try {
            // console.log(card.refs) //@debug
            const refsArray = card.refs;
            if (Array.isArray(refsArray) && refsArray.length === 0) {
                return (
                    <div>
                      {
                          listDocNum.includes(card.docum) ?
                            <div className='flex justify-center w-full'>
                              <CircularProgress size={25} />
                            </div>
                        : 
                          <div className='flex justify-between items-center mt-8'>
                            <div className='flex items-center'>
                              <ArrowRightIcon sx={{ mt: '0.2rem' }}/>
                              <p>Sem referências</p>
                            </div>
                            <Button
                              variant='outlined'
                              size='small'
                              onClick={() => {
                                apiGetRef(card.docum)
                              }}
                            >
                              Buscar Ref
                            </Button>
                          </div>
                      }
                    </div>
                );
            } else if (Array.isArray(refsArray)) {
                return refsArray.map((ref: string, index) => (
                    <div key={index} className='flex'>
                        <ArrowRightIcon/>
                        <div className='text-blue-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-per'>
                            <a href={ref}>{ref}</a>
                        </div>
                    </div>
                ));
            } else {
                return null;
            }
        } catch (e) {
            return (
                <div>
                    <div>{card.refs}</div>
                    <div>{String(e)}</div>
                    <div>Error: card.refs não é um array e não pode ser analisado como JSON!</div>
                </div>
            );
        }
    }

    return (
        <div className='w-full flex items-center flex-col'>
            <Box className='flex justify-center' sx={{ '& > :not(style)': { m: 1 }, width: '100%' }}>
                <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end" onClick={valid}><SearchIcon/></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        error={error}
                        onChange={
                            e => {
                                setSearchText(e.target.value);
                            }
                        }
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                    <FormHelperText id="outlined-weight-helper-text" error={error} >{error ? 'Este valor é inválido!' : ''}</FormHelperText>
                </FormControl>
            </Box>
            <div className='flex w-6/12 justify-center'>
                <div className='flex w-6/12 justify-center'>
                    <Box className='flex flex-wrap justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
                        { listCards.map((card : Video) => (
                            <div key={card.id} className='w-full mb-7 border border-slate-500 shadow-lg shadow-slate-500'>
                                <Card sx={{ maxWidth: 1800, minWidth: 200 }} className='h-full'>
                                  <CardContent>
                                      <Typography gutterBottom variant="h5" component="div" className='decoration-solid Roboto text-2xl font-semibold'>
                                          <a href={"https://www.youtube.com/watch?v=" + card.ytId}>{card.title}</a>
                                      </Typography>
                                      {RenderRefs(card)}
                                  </CardContent>
                                </Card>
                            </div>
                        )) }
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default ReloadRefs;
  