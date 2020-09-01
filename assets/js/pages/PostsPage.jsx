import React, {useState, useEffect} from 'react';

import { toast } from "react-toastify";   
import postsAPI from '../services/postsAPI';
import Pagination from '../components/Pagination';
import Axios from 'axios';
import { Facebook } from 'react-content-loader';


    
const Posts =  () => {


    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    const fetchPosts = async () => {
        try {
            const data = await postsAPI.findAll()
            /*await Axios
                .get(
                `https://rap4-life.com/apip/punchlines?pagination=true&count=${itemsPerPage}&page=${currentPage}`
            )*/
            .then(response => {
                setLoading(false);
                setposts(response.data);
                setTotalItems(response.data);
            
            });
        } catch (error) {
            toast.error("Unable to load posts");

        }
    } 
    
    useEffect(
        () => {
            fetchPosts();
    },
        [currentPage]
    );

    const handlePageChange = page => {
        setCurrentPage(page);
        setLoading(true);
    };
      const paginatedPost = Pagination.getData(
        posts,
        currentPage,
        itemsPerPage
      );
    return (
        <>
            <div>
                <section className="row-section">
                    <div className="container">
                        <div className="row">
                            <h2 className="text-center"><span>List of posts</span>Created by <i
                                className="fa fa-heart"></i> Anicet </h2>
                        </div>
    
                        {loading ? (
                            <Facebook />
    
                            ) : (
                            <div className={'row'}>
                                {posts.map(post =>
                                    <div className="col-md-10 offset-md-1 row-block" key={post.id}>
                                        <ul id="sortable">
                                            <li>
                                                <div className="media">
                                                    <div className="media-body">
                                                        <h4>{post.Auteur}</h4>
                                                        <p>{post.punchline}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
            <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            length={totalItems}
            onPageChanged={handlePageChange}
            />
                </section>
            </div>
        </>
        )
    }
    
export default Posts;