import React from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import './style.scss'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import useFetch from '../../../hooks/usefetch'
import Genres from '../../../components/genres/Genres'
import CircleRating from '../../../components/circleRating/CircleRating'
import Img from '../../../components/lazyLoadImage/Image'
import PosterFallback from '../../../assets/no-poster.png'

const DetailsBanner = () => {
  const { mediaType, id } = useParams()
  const { item, loading } = useFetch(`${mediaType}/${id}`)

  const _genres = item?.data?.genres

  const release_date = item?.data.aired ? item.data.aired.from : item?.data.published.from

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!item && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={item?.data?.images.jpg.large_image_url} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {item?.data?.images.jpg.large_image_url ? (
                      <Img className="posterImg" src={item?.data?.images.jpg.large_image_url} />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">{`${
                      item?.data?.title_english ? item?.data?.title_english : item?.data?.title
                    }`}</div>
                    <div className="subtitle">{item?.data?.title}</div>
                    <Genres data={_genres} />

                    <div className="row">
                      {item?.data?.score ? <CircleRating rating={item?.data?.score.toFixed(1)} /> : ''}
                      <a
                        href={`https://hianime.to/search?keyword=${item?.data?.title} `}
                        target="_black"
                        className="watch"
                      >
                        Watch online
                      </a>
                      <a href={`https://t.me/anime_in_alphabet`} target="_black" className="watch" id="download">
                        Download
                      </a>
                    </div>
                    <div className="overview">
                      <div className="heading">OverView</div>

                      <div className="description">{item?.data?.synopsis}</div>
                    </div>
                    <div className="info">
                      {item?.data?.status && (
                        <div className="infoItem">
                          <span className="text bold">status: </span>
                          <span className="text">{item?.data?.status}</span>
                        </div>
                      )}

                      {release_date && (
                        <div className="infoItem">
                          <span className="text bold">release Date: </span>
                          <span className="text">{dayjs(release_date).format('MMM D, YYYY')}</span>
                        </div>
                      )}
                      {item?.data?.duration && (
                        <div className="infoItem">
                          <span className="text bold">RunTime: </span>
                          <span className="text">{item?.data?.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  )
}

export default DetailsBanner
