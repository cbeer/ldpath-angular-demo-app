require 'restclient/components'
require 'rack/cache'
RestClient.enable Rack::Cache, 
  verbose: true,
  default_ttl: 600,
  metastore: "file:#{Rails.root}/tmp/rack-cache/meta",
  entitystore: "file:#{Rails.root}/tmp/rack-cache/body"