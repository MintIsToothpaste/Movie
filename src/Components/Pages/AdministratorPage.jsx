import AdministratorPageTemplate from '../Templates/AdministratorPageTemplate'
import { useState, useEffect } from 'react'

function AdministratorPage() {
    const [bannerData, setBannerData] = useState([])
    const [playlistData, setPlaylistData] = useState([])
    const [userData, setUserData] = useState([])
    const [manageType, setManageType] = useState(0)
    const changeManageType = num => setManageType(num)

    const fetchBannerData = url => {
        fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if(!data) {
                setBannerData([])
                return
            }
            const temp = []
            data.forEach(element => 
                temp.push({id: element.Id, movieId: element.MovieId, title: element.Title, type: element.Type, comment: element.Comment})
            )
            setBannerData(temp)
        })
    }

    const fetchPlaylistData = url => {
        fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if(!data) {
                setPlaylistData([])
                return
            }
            const temp = []
            data.forEach(element => {
                const arr = element.Playlist.split(',')
                temp.push({id: element.Id, title: element.Name, playlist: arr.map(movieId => parseInt(movieId)), type: element.Type})
            })
            setPlaylistData(temp)
        })
    }

    const fetchUserData = url => {
        fetch(url, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            if(!data) {
                setUserData([])
                return
            }
            const temp = []
            data.forEach(element => temp.push({id: element.Id, email: element.Email, nickname: element.Nickname, rank: element.Rank, signupDate: element.SignUpDate}))
            setUserData(temp)
        })
    }

    useEffect(() => {
        if(manageType == 0) {
            const url = 'http://13.209.26.226/v1/banner'
            fetchBannerData(url)  
        }
        else if(manageType == 1) {
            const url = 'http://13.209.26.226/v1/playlist'
            fetchPlaylistData(url)  
        }
        else {
            const url = 'http://13.209.26.226/v1/all-user'
            fetchUserData(url) 
        }
    }, [manageType])

    const addBannerData = (movieId, title, type, comment) => {
        const url = `http://13.209.26.226/v1/add-banner?movie_id=${movieId}&title=${title}&type=${type}&comment=${comment}`
        fetchBannerData(url)
    }

    const modifyBannerData = (id, movieId, title, type, comment) => {
        const url = `http://13.209.26.226/v1/change-banner?id=${id}&movie_id=${movieId}&title=${title}&type=${type}&comment=${comment}`
        fetchBannerData(url)
    }

    const deleteBannerData = id => {
        const url = `http://13.209.26.226/v1/delete-banner?id=${id}`
        fetchBannerData(url)
    }

    const addPlaylistData = (title, listString, type) => {
        const url = `http://13.209.26.226/v1/add-playlist?name=${title}&playlist=${listString}&type=${type}`
        fetchPlaylistData(url)
    }

    const modifyPlaylistData = (id, title, listString) => {
        console.log(id, title, listString)
        const url = `http://13.209.26.226/v1/change-playlist?id=${id}&name=${title}&playlist=${listString}`
        fetchPlaylistData(url)
    }

    const deletePlaylistData = id => {
        const url = `http://13.209.26.226/v1/delete-playlist?id=${id}`
        fetchPlaylistData(url)
    }

    const updateUserData = (id, rank) => {
        const url = `http://13.209.26.226/v1/update-user?id=${id}&rank=${rank}`
        fetchUserData(url)
    }

    const deleteUserData = id => {
        const url = `http://13.209.26.226/v1/delete-user?id=${id}`
        fetchUserData(url)
    }

    return(
        <AdministratorPageTemplate
            bannerData={bannerData}
            addBannerData={addBannerData}
            modifyBannerData={modifyBannerData}
            deleteBannerData={deleteBannerData}
            playlistData={playlistData}
            deletePlaylistData={deletePlaylistData}
            modifyPlaylistData={modifyPlaylistData}
            addPlaylistData={addPlaylistData}
            userData={userData}
            updateUserData={updateUserData}
            deleteUserData={deleteUserData}
            manageType={manageType} 
            changeManageType={changeManageType} 
        />
    )
}

export default AdministratorPage