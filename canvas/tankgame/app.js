/**
 * Created by peter on 14-12-13.
 */
require.config(
    {
        baseUrl: "game",
        paths: {
            "common": "../lib/common",
            "util":"../lib/util"
        }
    }
);
require(["stage"]);
