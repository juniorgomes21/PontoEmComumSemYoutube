import { useEffect, useState } from "react";
import api from "../../services/apiAxios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Alert, CircularProgress } from "@mui/material";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

type ObjFreeTubes = {
  id: number,
  ytId: string,
  title: string
}

type ObjFreeFiles = {
  id: number,
  file_number: number,
  file_name: string
}

interface State extends SnackbarOrigin {
  open: boolean;
}

function Comparison() {

  const [tubes, setTubes] = useState<ObjFreeTubes[]>([]);
  const [files, setFiles] = useState<ObjFreeFiles[]>([]);
  const [tubesCopy, setTubesCopy] = useState<ObjFreeTubes[]>([]);
  const [filesCopy, setFilesCopy] = useState<ObjFreeFiles[]>([]);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [fileSelectId, setFileSelect] = useState<number>(-1);
  const [tubeSelectId, setTubeSelect] = useState<number>(-1);
  const [searchTextFile, setSearchTextFile] = useState<string>('');
  const [searchTextTube, setSearchTextTube] = useState<string>('');
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;


  useEffect(() => {
    apiGetFreeTubes();
    apiGetFreeFiles();
  }, [])

  useEffect(() => {
    searchFun();
  }, [searchTextFile]);

  useEffect(() => {
    searchFunTube();
  }, [searchTextTube]);

  async function apiGetFreeTubes() {
    // setLoading(true);
    try {
        const resonse = await api.get('/myvideo/getfreetubes');
        // console.log("getfreetubes:", resonse.data); //@debug
        const array: ObjFreeTubes[] = resonse.data;
        setTubes(array.reverse());   
        setTubesCopy(resonse.data);
    } catch (e: any) {
        console.log(e);
    }
    // setLoading(false);
  }

  async function apiGetFreeFiles() {
    // setLoading(true);
    try {
        const resonse = await api.get('/myvideo/getfreefiles');
        // console.log("getfreefiles:", resonse.data); //@debug
        setFiles(resonse.data);  
        setFilesCopy(resonse.data);   
    } catch (e: any) {
        console.log(e);
    }
    // setLoading(false);
  }

  async function apiSave() {
    setLoadingSave(false);
    try {
      const obj = {
        file_id: fileSelectId,
        youtube_id: tubeSelectId
      }
      await api.post("/myvideo/one", obj);
      handleClick({ vertical: 'top', horizontal: 'center' });
      apiGetFreeFiles();
      apiGetFreeTubes();
    } catch(e: any) {
      console.log(`Error ${e}`);
    }
    setLoadingSave(false);
  }

  function select(id: number, local: string) {
    if (local === "tube") {
      setTubeSelect(id);
    } else {
      setFileSelect(id);
    }
  }

  function searchFun() {
    let newCards = filesCopy.filter(card => (card.file_name.toLowerCase().includes(searchTextFile)));
    setFiles(newCards);
  }

  function searchFunTube() {
    let newCards = tubesCopy.filter(card => (card.title.toLowerCase().includes(searchTextTube)));
    setTubes(newCards);
  }

  function handleClick(newState: SnackbarOrigin) {
    setState({ ...newState, open: true });
  };

  function handleClose() {
    setState({ ...state, open: false });
  };

  return (
      <div className="flex justify-center h-full relative">
        <div className="flex-col w-[98%] relative">
          <div className="fixed bottom-10 right-10">
            <Button
              color="success"
              variant="contained"
              onClick={apiSave}
            >
              { loadingSave ? <CircularProgress size={26} color="warning"/> : "Salvar"}
            </Button>
          </div>
          <div className="flex w-[98%]">
            <div className="w-1/2 h-full">
              <div className="m-2">
                <TextField
                  fullWidth
                  placeholder="Pesquisar"
                  size="small"
                  value={searchTextFile}
                  onChange={ e => {
                    setSearchTextFile(e.target.value);
                  }}
                />
              </div>
              {
                files.map((item, index) => (
                  <div
                    key={index}
                    className={`border-[1px] border-zinc-500 rounded-md p-2 m-2 cursor-pointer ${item.id == fileSelectId ? "bg-green-300 border-green-500" : ""}`}
                    onClick={() => {
                      select(item.id, "file");
                    }}
                  >
                    {item.file_name}
                  </div>
                ))
              }
            </div>
            <div className="w-1/2 h-full border-l-[1px] border-zinc-600">
              <div className="m-2">
                <TextField
                  fullWidth
                  placeholder="Pesquisar"
                  size="small"
                  value={searchTextTube}
                  onChange={ e => {
                    setSearchTextTube(e.target.value);
                  }}
                />
              </div>
              {
                tubes.map((item, index) => (
                  <div
                    key={index}
                    className={`border-[1px] border-zinc-500 rounded-md p-2 m-2 cursor-pointer ${item.id == tubeSelectId ? "bg-green-300 border-green-500" : ""}`}
                    onClick={() => {
                      select(item.id, "tube");
                    }}
                  >
                    {item.title}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert variant="filled" severity="success">Referencia Salva</Alert>
        </Snackbar>
      </div>
  )
}

export default Comparison;
