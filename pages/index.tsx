import Head from 'next/head'
import Image from 'next/image'
import Header from "../components/Header";
import Banner from "../components/Banner";
import requests from "../utils/requests";
import {Movie} from "../typings";

interface Props {
    netflixOriginals: Movie[]
    trendingNow: Movie[]
    topRated: Movie[]
    actionMovies: Movie[]
    comedyMovies: Movie[]
    horrorMovies: Movie[]
    romanceMovies: Movie[]
    documentaries: Movie[]
}

const Home = ({
                  netflixOriginals,
                  actionMovies,
                  comedyMovies,
                  documentaries,
                  horrorMovies,
                  romanceMovies,
                  topRated,
                  trendingNow,
              } : Props) => {
    console.log(netflixOriginals);
    return (
        <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]" >
            <Head>
                <title>Home - Netflix</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <main>
                <Banner netflixOriginals={netflixOriginals}/>
                <section>
                    {/*    Row */}
                    {/*    Row */}
                    {/*    Row */}
                    {/*    Row */}
                    {/*    Row */}
                    {/*    Row */}
                </section>
            </main>
            {/*    Modal   */}
        </div>
    )
}

export default Home

/**
 * Promise.all : 여러 개의 프라미스를 동시에 실행시키고 모든 프라미스가 준비될 떄까지 기다린다.
 * 복수의 url에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때 이런 상황이 발생한다.
 * 배열 안 프라미스가 모두 처리되면  새로운 프라미스가 이행되는데, 배열 안 프라미스의 결괏값을 담은 배열이
 * 새로운 프라미스의 result가 된다.
 * 배열 result의 요소 순서는 Promise.all에 전달되는 프라미스 순서와 상응한다.
 * 작업해야 할 데이터가 담긴 배열을 프라미스 배열로 매핑하고, 이 배열을 Promise.all로 감싸는 트릭은 자주 사용된다.
 * Promise.all에 전달되는 프라미스 중 하나라도 거부되면, Promise.all이 반환하는 프라미스는 에러와 함께 바로 거부됩니다.
 * 프라미스가 하나라도 거부되면 Promise.all은 즉시 거부되고 배열에 저장된 다른 프라미스의 결과는 완전히 무시됩니다. 이행된 프라미스의 결과도 무시되죠.
 * fetch를 사용해 호출 여러 개를 만들면, 그중 하나가 실패하더라도 호출은 계속 일어납니다.
 * 그렇더라도 Promise.all은 다른 호출을 더는 신경 쓰지 않습니다.
 * 프라미스가 처리되긴 하겠지만 그 결과는 무시됩니다.
 */
export const getServerSideProps = async () => {
    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ])
    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            comedyMovies: comedyMovies.results,
            horrorMovies: horrorMovies.results,
            romanceMovies: romanceMovies.results,
            documentaries: documentaries.results,
        }
    }
}


