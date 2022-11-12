import React from "react";
import config from "../config.json";
import styled from "styled-components"
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline"

function HomePage() {
  const estilosDaHomePage = {

    //  backgroundColor: "red" 

  };
  const [valorDaFiltro, setValorDaFiltro] = React.useState("");

  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        <Menu valorDaFiltro={valorDaFiltro} setValorDaFiltro={setValorDaFiltro} />
        <Header />
        <Timeline searchValue={valorDaFiltro} playlists={config.playlists} >
          Conteudo
        </Timeline>
      </div>
    </>

  );
}

export default HomePage;

// function Menu() {
//   return (
//     <div>Menu</div>

//   );
// }

const StyledHeader = styled.div`
  img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info{
    display: flex;
    align-items: center;
    width: 100%;
    padding:16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
    background: #00f;
    background-image: url(${({ bg }) => bg});
    background-repeat: no-repeat;
    height: 260px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section >

    </StyledHeader>

  );
}

function Timeline({ searchValue, ...props }) {
  const playlistNames = Object.keys(props.playlists);
  //statement
  //retorno por expressão

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const seachValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(seachValueNormalized);
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>

                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>

  );
}
