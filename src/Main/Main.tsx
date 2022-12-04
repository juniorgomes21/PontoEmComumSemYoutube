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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import YouTube, { YouTubeProps } from 'react-youtube';
import api from '../services/apiAxios';
import { CircularProgress } from '@mui/material';

type Videos = {
    id: number;
    ytId: string;
    title: string;
    file: string;
    docum: number;
    refs: [];
}

function Main() {

    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [cards, setCards] = useState<Videos[]>([]);
    const [listCards, setListCards] = useState<Videos[]>([]);

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
            const resonse = await api.get('/myvideos');
            setListCards(resonse.data);
            setCards(resonse.data);
            setLoading(false);
            
        } catch (e: any) {
            console.log(e);
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
                {
                    loading

                    ? 
                        <div className='flex w-full h-full justify-center items-center'>
                            <CircularProgress />
                        </div>
                    :

                    <div className='flex w-6/12 justify-center'>
                        <Box className='flex flex-wrap justify-center' sx={{ '& > :not(style)': { m: 1 } }}>
                            { listCards.map((card : Videos) => (
                                <div key={card.id} className='w-full mb-7 border border-slate-500 shadow-lg shadow-slate-500'>
                                    <Card sx={{ maxWidth: 1800, minWidth: 200 }} className='h-full'>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" className='decoration-solid Roboto text-2xl font-semibold'>
                                                <a href={"https://www.youtube.com/watch?v=" + card.ytId}>{card.title}</a>
                                            </Typography>
                                            {card.refs.map((ref, index) => (
                                                <div key={index} className='flex'>
                                                    <ArrowRightIcon/>
                                                    <div className='text-blue-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-per'>
                                                        <a href={ref}>{ref}</a>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                </div>
                            )) }
                        </Box>
                    </div>
                }
            </div>
        </div>
    )
}

export default Main;