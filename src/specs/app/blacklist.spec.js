describe("app/Blacklist", function() {
    var Module, sandbox;

    beforeEach(() => {
        Module = require("../../app/Blacklist");
        sandbox = sinon.sandbox.create();
    });

    afterEach(() => {
        sandbox.restore();
    });
    
    describe("instantiation", () => {
        
        it("should extend EventEmitter", () => {
            var {EventEmitter} = require("events");
            var blacklist = new Module();
            
            expect(blacklist).to.be.an.instanceof(EventEmitter);
        });
        
        it("should call this.load", function() {
            var spy = sandbox.spy();
            var stub = sandbox.stub(Module.prototype, "load", spy);

            new Module();

            expect(spy).calledOnce;
        });

        it("should create assign a '_blacklist' property", () => {
            var blacklist;

            // Stub the load method so it doesn't try to access local storage.
            sandbox.stub(Module.prototype, "load").returns({});

            expect(Module.prototype._blacklist).to.be.undefined;
            
            blacklist = new Module();
            
            expect(blacklist._blacklist).to.exist;
            expect(blacklist._blacklist).to.be.an("object");
        });

        it("should call this.save when the the 'change' event is triggered", () => {
            var spy = sandbox.spy();
            var stub = sandbox.stub(Module.prototype, "on", spy);
            var blacklist;

            // Stub the load method so it doesn't try to access local storage.
            sandbox.stub(Module.prototype, "load").returns({});
            
            blacklist = new Module();
            
            expect(spy).calledOnce;
            expect(spy.firstCall.args).eql(["change", blacklist.save]);
        });
        
    });

    xdescribe("methods", () => {
        var blacklist;
        
        beforeEach(() => {
            blacklist = new Module();
        });

        describe("load", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("save", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("add", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("del", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("update", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("validate", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("emitChange", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });

        describe("get", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });
        
    });

    xdescribe("private functions", () => {
        var blacklist;
        
        beforeEach(() => {
            blacklist = new Module();
        });
        
        describe("sanitizeInput", () => {

            it("should work as expected", () => {
                expect("completed").to.eq(true);
            });
            
        });
        
    });
    
});
