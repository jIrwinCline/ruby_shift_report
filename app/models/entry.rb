class Entry < ApplicationRecord
    belongs_to :report, required: false

    validates :body, presence: true
    validates :time, presence: true
end
