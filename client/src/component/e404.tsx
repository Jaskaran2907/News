export default function E404(){
    return(
        <div className="container mt-3">
          <div className="row justify-content-center">
            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
              <div className="card shadow-sm text-center p-4 w-100">
                <h4 className="text-muted">No Results Found</h4>
                <p className="text-secondary mb-0">
                  Try adjusting your search or filters.
                </p>
              </div>
            </div>
          </div>
        </div>
    );
}