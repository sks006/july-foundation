import '../css/page_header.css';

export default function PageHeader({  path, name }) {

    return (
        <div className="page-header" >
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>Apply for Aid</h2>
                    </div>
                    <div className="col-12">
                        <a href="/">Home</a>
                        <a href={path}>Aid</a>
                    </div>
                </div>
            </div>
        </div>
    );
}